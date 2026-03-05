import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Car, Battery, Zap } from "lucide-react";

const GRID_WIDTH = 32;
const GRID_HEIGHT = 18;
const INITIAL_SNAKE = [{ x: 16, y: 9 }];

const INITIAL_SPEED_MS = INITIAL_SPEED_MS;
const MIN_SPEED_MS = 60;
const SPEEDUP_DELAY_MS = 10000;
const SPEED_MULTIPLIER = 0.92;
const POINTS_PER_FOOD = 1;

function msToKmh(ms) {
  return Math.round(3600 / ms * 10);
}

function safeParseHighScore() {
  try {
    const raw = localStorage.getItem("snakeHighScore");
    return Number.parseInt(raw || "0", 10) || 0;
  } catch {
    return 0;
  }
}

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(null);
  const [direction, setDirection] = useState("right"); // 'up' | 'down' | 'left' | 'right'
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => safeParseHighScore());
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(150); // ms per tick
  const [startTime, setStartTime] = useState(0);
  const [batteryCount, setBatteryCount] = useState(0);
  const [deathInfo, setDeathInfo] = useState({ reason: '', position: {x: 0, y: 0}, direction: 'right', details: '' });

  // Refs to avoid stale closures inside setInterval tick
  const directionRef = useRef("right");
  const foodRef = useRef(null);
  const startTimeRef = useRef(0);
  const gameOverRef = useRef(false);
  const pausedRef = useRef(false);
  const gameStartedRef = useRef(false);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);

  useEffect(() => { gameOverRef.current = gameOver; }, [gameOver]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { gameStartedRef.current = gameStarted; }, [gameStarted]);

  const CELL_CLASS = useMemo(
    () => "flex items-center justify-center leading-none select-none",
    []
  );

  const generateFood = (snakeArr) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      };
    } while (snakeArr.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  };

  const isReverse = (nextDir, currentDir) => {
    return (
      (nextDir === "up" && currentDir === "down") ||
      (nextDir === "down" && currentDir === "up") ||
      (nextDir === "left" && currentDir === "right") ||
      (nextDir === "right" && currentDir === "left")
    );
  };

  const startGame = () => {
    const freshSnake = INITIAL_SNAKE;
    setSnake(freshSnake);
    setDirection("right");
    setScore(0);
    setGameOver(false);
    setPaused(false);
    setGameStarted(true);
    setBatteryCount(0);
    setDeathInfo({ reason: '', position: {x: 0, y: 0}, direction: 'right', details: '' });

    const now = Date.now();
    setStartTime(now);

    // Put food somewhere valid immediately
    setFood(generateFood(freshSnake));

    // Reset to default speed
    setSpeed(INITIAL_SPEED_MS);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setSnake(INITIAL_SNAKE);
    setScore(0);
    setBatteryCount(0);
    setDirection("right");
    setSpeed(INITIAL_SPEED_MS);
    setDeathInfo({ reason: '', position: {x: 0, y: 0}, direction: 'right', details: '' });
  };

  // Game tick (interval calls this)
  const tick = () => {
    setSnake((prevSnake) => {
      if (gameOverRef.current || pausedRef.current || !gameStartedRef.current) return prevSnake;

      const dir = directionRef.current;
      const currentFood = foodRef.current;
      if (!currentFood) return prevSnake;

      const head = { ...prevSnake[0] };
      if (dir === "up") head.y -= 1;
      else if (dir === "down") head.y += 1;
      else if (dir === "left") head.x -= 1;
      else if (dir === "right") head.x += 1;

      // Wall collision
      const hitWall =
        head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT;

      // Self collision (compare with body)
      const hitSelf = prevSnake
        .slice(1)
        .some((seg) => seg.x === head.x && seg.y === head.y);

      if (hitWall) {
        let details = '';
        if (head.x < 0) details = 'Hit left wall';
        else if (head.x >= GRID_WIDTH) details = `Hit right wall at x=${head.x}`;
        else if (head.y < 0) details = 'Hit top wall';
        else if (head.y >= GRID_HEIGHT) details = `Hit bottom wall at y=${head.y}`;
        
        setDeathInfo({
          reason: 'wall',
          position: {x: head.x, y: head.y},
          direction: dir,
          details
        });
        setGameOver(true);
        return prevSnake;
      }

      if (hitSelf) {
        setDeathInfo({
          reason: 'self',
          position: {x: head.x, y: head.y},
          direction: dir,
          details: 'Hit own body'
        });
        setGameOver(true);
        return prevSnake;
      }

      // Build new snake: add head to front, then pop tail if not eating
      const newSnake = [head, ...prevSnake];

      const ateFood = head.x === currentFood.x && head.y === currentFood.y;

      if (ateFood) {

        // Update score using functional updates to avoid stale values
        setScore((s) => {
          const next = s + POINTS_PER_FOOD;

          setHighScore((hs) => {
            const newHS = Math.max(hs, next);
            try {
              localStorage.setItem("snakeHighScore", String(newHS));
            } catch {}
            return newHS;
          });

          return next;
        });

        // Increment battery count
        setBatteryCount((c) => c + 1);

        // Spawn new food (based on new snake, so it never spawns on snake)
        const newFood = generateFood(newSnake);
        setFood(newFood);

        // Optional ramp: after 10s, speed up slightly on each food (clamped)
        const elapsed = Date.now() - (startTimeRef.current || Date.now());
        if (elapsed >= SPEEDUP_DELAY_MS) {
          setSpeed((ms) => Math.max(MIN_SPEED_MS, Math.floor(ms * SPEED_MULTIPLIER)));
        }
      } else {
        // Not eating: remove tail once (THIS fixes the “snake disappears” bug)
        newSnake.pop();
      }

      return newSnake;
    });
  };

  // Interval loop
  useEffect(() => {
    if (!gameStartedRef.current || pausedRef.current || gameOverRef.current) return;

    const id = setInterval(tick, speed);
    return () => clearInterval(id);
  }, [speed, gameStarted]); // tick uses refs, so deps stay stable

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e) => {
      if (!gameStartedRef.current || gameOverRef.current) return;

      const current = directionRef.current;
      let next = null;

      if (e.key === "ArrowUp") next = "up";
      else if (e.key === "ArrowDown") next = "down";
      else if (e.key === "ArrowLeft") next = "left";
      else if (e.key === "ArrowRight") next = "right";
      else if (e.key === "p" || e.key === "P") {
        setPaused((p) => !p);
        return;
      } else {
        return;
      }

      if (next && !isReverse(next, current)) setDirection(next);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const renderBoard = useCallback(() => {
    return (
      <div
        className="grid gap-0 border-4 border-red-400 bg-slate-800 w-full aspect-[16/9] p-0 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.5),0_0_30px_rgba(255,255,255,0.2)] overflow-visible"
        style={{
          gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
        }}
      >
        {Array.from({ length: GRID_HEIGHT }, (_, y) =>
          Array.from({ length: GRID_WIDTH }, (_, x) => {
            const isHead = snake[0]?.x === x && snake[0]?.y === y;
            const bodyIndex = snake.findIndex((seg, i) => i > 0 && seg.x === x && seg.y === y);
            const isBody = bodyIndex > 0;
            const isBatteryTrail = isBody && bodyIndex <= batteryCount;
            const isFood = gameStarted && food && food.x === x && food.y === y;

            if (isHead) {
              return (
                <div
                  key={`${x}-${y}`}
                  className={CELL_CLASS}
                  title="Head"
                >
                  <Car className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
                </div>
              );
            }

            if (isBatteryTrail) {
              return (
                <div
                  key={`${x}-${y}`}
                  className={CELL_CLASS}
                  title="Battery"
                >
                  <Battery className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400" fill="currentColor" />
                </div>
              );
            }

            if (isBody) {
              return (
                <div
                  key={`${x}-${y}`}
                  className={CELL_CLASS}
                  title="Body"
                >
                  <Car className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                </div>
              );
            }

            if (isFood) {
              return (
                <div
                  key={`${x}-${y}`}
                  className={CELL_CLASS}
                  title="Food"
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" />
                </div>
              );
            }

            return (
              <div
                key={`${x}-${y}`}
                className={CELL_CLASS}
              />
            );
          })
        )}
      </div>
    );
  }, [snake, food, gameStarted, batteryCount, CELL_CLASS]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              ⚡ Tesla Snake Game ⚡
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              A modern take on the classic snake game with Tesla-themed graphics
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Current Score</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">High Score</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{highScore}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Speed</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{msToKmh(speed)} <span className="text-xs font-normal">km/h</span></p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">Batteries</p>
              <p className="text-2xl font-bold text-yellow-500">{batteryCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
        {renderBoard()}
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Game Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Movement:</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>↑ Arrow Up - Move Up</li>
              <li>↓ Arrow Down - Move Down</li>
              <li>← Arrow Left - Move Left</li>
              <li>→ Arrow Right - Move Right</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Game Actions:</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>P - Pause/Resume Game</li>
              <li>Start Button - Begin New Game</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        {!gameStarted && (
          <button
            onClick={startGame}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105"
          >
            Start Game
          </button>
        )}

        {gameOver && (
          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105"
          >
            Play Again
          </button>
        )}

        {gameStarted && !gameOver && (
          <button
            onClick={() => setPaused((p) => !p)}
            className={`font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all ${
              paused
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-yellow-500 hover:bg-yellow-600 text-white"
            } transform hover:scale-105`}
          >
            {paused ? "Resume Game" : "Pause Game"}
          </button>
        )}
      </div>

      {/* Game Over Overlay */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700 text-center max-w-md w-full mx-4">
            <h2 className="text-3xl font-bold text-red-500 mb-4">Game Over!</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-2">Final Score: {score}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Reason: {deathInfo.details}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Position: x={deathInfo.position.x}, y={deathInfo.position.y}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Direction: {deathInfo.direction}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Batteries: {batteryCount}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105"
              >
                Play Again
              </button>
              <button
                onClick={resetGame}
                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paused Overlay */}
      {paused && !gameOver && gameStarted && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 text-center max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Game Paused</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Press 'P' to resume the game</p>
          </div>
        </div>
      )}
    </div>
  );
}