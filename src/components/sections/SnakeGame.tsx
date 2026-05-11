import { useEffect, useRef, useState } from "react";

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID_SIZE = 20;
    const MAX_LENGTH = 100;
    const TICK_RATE = 80;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    const getCols = () => Math.floor(width / GRID_SIZE);
    const getRows = () => Math.floor(height / GRID_SIZE);

    // Game state
    const target = { x: width / 2, y: height / 2 };
    let cols = getCols();
    let rows = getRows();
    
    let snake = [
      { x: Math.floor(cols / 2), y: Math.floor(rows / 2) },
      { x: Math.floor(cols / 2), y: Math.floor(rows / 2) + 1 },
      { x: Math.floor(cols / 2), y: Math.floor(rows / 2) + 2 },
      { x: Math.floor(cols / 2), y: Math.floor(rows / 2) + 3 },
      { x: Math.floor(cols / 2), y: Math.floor(rows / 2) + 4 },
    ];
    let direction = { x: 0, y: -1 };
    
    let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    
    let animationFrameId: number;
    let lastInteractionTime = 0;
    let isAutopilot = true;
    let lastTime = 0;

    const handlePointerDown = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      lastInteractionTime = Date.now();
      isAutopilot = false;
    };
    const handleMouseLeave = () => { isAutopilot = true; };
    window.addEventListener("pointerdown", handlePointerDown as EventListener);
    window.addEventListener("mouseleave", handleMouseLeave);

    const update = (time: number) => {
      animationFrameId = requestAnimationFrame(update);

      if (time - lastTime < TICK_RATE) {
        return;
      }
      lastTime = time;

      cols = getCols();
      rows = getRows();

      if (!isAutopilot && Date.now() - lastInteractionTime > 2000) {
        isAutopilot = true;
      }

      let targetGrid = isAutopilot 
        ? food 
        : { x: Math.floor(target.x / GRID_SIZE), y: Math.floor(target.y / GRID_SIZE) };

      const head = snake[0];
      const dx = targetGrid.x - head.x;
      const dy = targetGrid.y - head.y;

      // Smart turn logic
      if (direction.x !== 0) { // moving horizontally
        if (head.x === targetGrid.x) { // aligned X, turn Y
          direction = { x: 0, y: dy > 0 ? 1 : -1 };
        } else if ((dx > 0 && direction.x < 0) || (dx < 0 && direction.x > 0)) { // moving away in X
          direction = { x: 0, y: dy > 0 ? 1 : (dy < 0 ? -1 : (Math.random() > 0.5 ? 1 : -1)) };
        } else if (dy !== 0 && Math.random() < 0.1) { // occasionally correct path if offset
          // allow zig zag
        }
      } else { // moving vertically
        if (head.y === targetGrid.y) { // aligned Y, turn X
          direction = { x: dx > 0 ? 1 : -1, y: 0 };
        } else if ((dy > 0 && direction.y < 0) || (dy < 0 && direction.y > 0)) { // moving away in Y
          direction = { x: dx > 0 ? 1 : (dx < 0 ? -1 : (Math.random() > 0.5 ? 1 : -1)), y: 0 };
        }
      }

      // Collision avoidance AI (don't hit self locally)
      const isDangerous = (nx: number, ny: number) => {
        let nvx = nx; let nvy = ny;
        if (nvx < 0) nvx = cols - 1;
        if (nvx >= cols) nvx = 0;
        if (nvy < 0) nvy = rows - 1;
        if (nvy >= rows) nvy = 0;
        return snake.some((segment, index) => index !== snake.length - 1 && segment.x === nvx && segment.y === nvy);
      };

      if (isDangerous(head.x + direction.x, head.y + direction.y)) {
        // Try other directions
        const safeDirs = [
          {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}
        ].filter(d => !(d.x === -direction.x && d.y === -direction.y) && !isDangerous(head.x + d.x, head.y + d.y));
        
        if (safeDirs.length > 0) {
          // Pick the one closest to target if possible
          safeDirs.sort((a, b) => {
             let distA = Math.hypot((head.x + a.x) - targetGrid.x, (head.y + a.y) - targetGrid.y);
             let distB = Math.hypot((head.x + b.x) - targetGrid.x, (head.y + b.y) - targetGrid.y);
             return distA - distB;
          });
          direction = safeDirs[0];
        }
      }

      let nextX = head.x + direction.x;
      let nextY = head.y + direction.y;

      // Wrap around screen
      if (nextX < 0) nextX = cols - 1;
      if (nextX >= cols) nextX = 0;
      if (nextY < 0) nextY = rows - 1;
      if (nextY >= rows) nextY = 0;

      // Move snake
      snake.unshift({ x: nextX, y: nextY });

      // Hit food
      if (nextX === food.x && nextY === food.y) {
        food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
        setScore(s => s + 1);
      } else {
        snake.pop();
      }

      if (snake.length > MAX_LENGTH) {
        snake.pop();
      }

      // Draw
      ctx.clearRect(0, 0, width, height);

      // Draw Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cols * GRID_SIZE * 0.1, 0);
      ctx.lineTo(cols * GRID_SIZE * 0.1, height);
      ctx.moveTo(cols * GRID_SIZE * 0.5, 0);
      ctx.lineTo(cols * GRID_SIZE * 0.5, height);
      ctx.moveTo(cols * GRID_SIZE * 0.9, 0);
      ctx.lineTo(cols * GRID_SIZE * 0.9, height);
      ctx.moveTo(0, rows * GRID_SIZE * 0.3);
      ctx.lineTo(width, rows * GRID_SIZE * 0.3);
      ctx.moveTo(0, rows * GRID_SIZE * 0.7);
      ctx.lineTo(width, rows * GRID_SIZE * 0.7);
      ctx.stroke();

      // Draw Food
      ctx.fillStyle = "#ff2a00";
      ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);

      // Draw Snake
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
          ctx.fillStyle = "#ff2a00"; // Head
        } else if (i === 1) {
          ctx.fillStyle = "#ffffff"; // Body
        }
        ctx.fillRect(snake[i].x * GRID_SIZE, snake[i].y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
      }
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handlePointerDown as EventListener);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <canvas ref={canvasRef} className="block w-full h-full opacity-[0.25] mix-blend-screen cursor-crosshair" />
      {score > 0 && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[10%] xl:left-[calc(50%-600px)] pointer-events-none text-white/50 font-mono text-[10px] tracking-widest uppercase">
          Snake Score // {score.toString().padStart(3, '0')}
        </div>
      )}
    </div>
  );
}
