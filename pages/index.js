import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import styles from "../styles/Snake.module.css";

const Config = {
  height: 25,
  width: 25,
  cellSize: 32,
};

const CellType = {
  Snake: "snake",
  Food: "food",
  Empty: "empty",
};

const Direction = {
  Left: { x: -1, y: 0 },
  Right: { x: 1, y: 0 },
  Top: { x: 0, y: -1 },
  Bottom: { x: 0, y: 1 },
};

const Cell = ({ x, y, type }) => {
  const getStyles = () => {
    switch (type) {
      case CellType.Snake:
        return {
          backgroundColor: "yellowgreen",
          borderRadius: 8,
          padding: 2,
        };

      case CellType.Food:
        return {
          backgroundColor: "darkorange",
          borderRadius: 20,
          width: 32,
          height: 32,
        };

      default:
        return {};
    }
  };
  return (
    <div
      className={styles.cellContainer}
      style={{
        left: x * Config.cellSize,
        top: y * Config.cellSize,
        width: Config.cellSize,
        height: Config.cellSize,
      }}
    >
      <div className={styles.cell} style={getStyles()}></div>
    </div>
  );
};

// generate new food
const getRandomCell = () => ({
  x: Math.floor(Math.random() * Config.width),
  y: Math.floor(Math.random() * Config.width),
});

const Snake = () => {
  const getDefaultSnake = () => [
    { x: 8, y: 12 },
    { x: 7, y: 12 },
    { x: 6, y: 12 },
  ];

  // snake[0] is head and snake[snake.length - 1] is tail
  const [snake, setSnake] = useState(getDefaultSnake());
  const [direction, setDirection] = useState(Direction.Right);

  const [score, setScore] = useState(0);
  // food array
  const [foodArr, setFoodArr] = useState([{ x: 4, y: 10 }]);

  // move the snake
  useEffect(() => {
    const runSingleStep = () => {
      setSnake((snake) => {
        const head = snake[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        // make a new snake by extending head
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        const newSnake = [newHead, ...snake];

        // remove tail
        newSnake.pop();

        return newSnake;
      });
    };

    runSingleStep();
    const timer = setInterval(runSingleStep, 500);

    return () => clearInterval(timer);
  }, [direction]);

  // update score whenever head touches a food
  useEffect(() => {
    setTimeout(() => {
      // head of snake means first cell of green
      const head = snake[0];
      // tail of snake mean remaining cells of snake which are in green
      const tail = snake.slice(0);
      // task 1-2
      // checking snake collision with itself
      for (var i = 3; i < snake.length; i++) {
        if (
          head.x === tail[i].x &&
          head.x !== 1 &&
          head.x !== 23 &&
          head.y === tail[i].y &&
          head.y !== 1 &&
          head.y !== 23
        ) {
          // reload the page
          window.location.reload();
        }
      }
      // if snake eats food / collided its head with food
      if (isFoodArr(head)) {
        // task 1-1
        // increase snake size
        setSnake((prev) => {
          return [...prev, { x: 6, y: 12 }];
        });
        // increase score by 1
        setScore((score) => {
          return score + 1;
        });
        // remove the food which has been eaten by snake
        setFoodArr((prev) =>
          [...prev].filter((filt) => head.x !== filt.x && head.y !== filt.y)
        );
      }
    }, 500);
    // this useEffect will run again when snake value changes
  }, [snake]);

  // task 1-4
  useEffect(() => {
    // generate new food after every 3 secs
    const interval = window.setInterval(() => {
      let newFood = getRandomCell();
      setFoodArr((prev) => [...prev, newFood]);
    }, 3000);

    // remove food after every 10 secs
    const removeAfter10 = window.setInterval(() => {
      setFoodArr((prev) => [...prev].slice(1));
    }, 10000);
    return () => {
      // clean up
      clearInterval(interval);
      clearInterval(removeAfter10);
    };
  }, []);

  // default direction
  let key = "ArrowRight";

  useEffect(() => {
    const handleNavigation = (event) => {
      // task 1-2
      switch (event.key) {
        case "ArrowUp":
          // check if key is equal to ArrowDown then it will not move in opposite direction which
          // in this case is ArrowUp
          if (key === "ArrowDown") {
            return;
          }
          setDirection(Direction.Top);
          key = event.key;
          break;

        case "ArrowDown":
          // same logic as the above
          if (key === "ArrowUp") {
            return;
          }
          setDirection(Direction.Bottom);
          key = event.key;
          break;

        case "ArrowLeft":
          // same logic as the above
          if (key === "ArrowRight") {
            return;
          }
          setDirection(Direction.Left);
          key = event.key;
          break;

        case "ArrowRight":
          // same logic as the above
          if (key === "ArrowLeft") {
            return;
          }
          setDirection(Direction.Right);
          key = event.key;
          break;
      }
    };
    window.addEventListener("keydown", handleNavigation);

    return () => window.removeEventListener("keydown", handleNavigation);
  }, []);

  // task 1-3
  // well i didnt think of any good name sorry for that
  // it detects border collision with snake
  const someFunc = (index, sign, y) => {
    // it is checking y param is empty then its x axis so this check will work otherwise the
    // else check will be executed which is checking y value
    if (!y) {
      let ind = index;
      const arr = snake;
      const updatedArray = arr.map((sna) => {
        // if x = 0 then i changed index to 24 which is last cell in the opposite direction
        // and vice versa
        // if x === 0 then i am incrementing otherwise decrementing
        return { ...sna, x: sign ? ind + 1 : ind - 1 };
      });
      setTimeout(() => {
        setSnake(updatedArray);
      }, 300);
    } else {
      let ind = index;
      const arr = snake;
      const updatedArray = arr.map((sna) => {
        // if y === 0 then i am incrementing otherwise decrementing
        return { ...sna, y: sign === "+" ? ind + 1 : ind - 1 };
      });
      setTimeout(() => {
        setSnake(updatedArray);
      }, 300);
    }
  };
  // ?. is called optional chaining
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

  // checking if cell is food or not
  const isFoodArr = ({ x, y }) => foodArr.find((f) => f.x === x && f.y === y);

  // checking if cell is snake
  const isSnake = ({ x, y }) => {
    return snake.find((position) => position.x === x && position.y === y);
  };

  const cells = [];

  // setting cells based on width and height
  for (let x = 0; x < Config.width; x++) {
    for (let y = 0; y < Config.height; y++) {
      let type = CellType.Empty;
      // task 1-4
      if (isFoodArr({ x, y })) {
        type = CellType.Food;
      } else if (isSnake({ x, y })) {
        type = CellType.Snake;
        // task 1-3
        // if cell has 24 x value then i am changing its value to 0 the opposite cell in the
        // row and vice wersa
        // if cell has 24 y value then i am changing its value to 0 the opposite cell in the
        // column and vice wersa
        x === 24
          ? someFunc(0, "+", "")
          : x === 0
          ? someFunc(24, "", "")
          : y === 24
          ? someFunc(0, "+", "y")
          : y === 0
          ? someFunc(24, "-", "y")
          : "";
      }
      cells.push(<Cell key={`${x}-${y}`} x={x} y={y} type={type} />);
    }
  }
  return (
    <div className={styles.container}>
      <div
        className={styles.header}
        style={{ width: Config.width * Config.cellSize }}
      >
        Score: {score}
      </div>
      <div
        className={styles.grid}
        style={{
          height: Config.height * Config.cellSize,
          width: Config.width * Config.cellSize,
        }}
      >
        {cells}
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Snake), {
  ssr: false,
});
