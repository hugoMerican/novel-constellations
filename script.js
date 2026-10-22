
const stars = document.querySelectorAll(".night-sky .star");
const lines = document.querySelectorAll(".connections line");

const originalPositions = [
    { x: 20, y: 30 },
    { x: 45, y: 50 },
    { x: 76, y: 75 },
    { x: 19, y: 53 },
    { x: 50, y: 73 }
];



function animate(time) {

    const seconds = time / 1000;

    // Calculate where each star is right now
    const positions = originalPositions.map((position, index) => {

        const x = position.x +
            Math.sin(seconds * 0.35 + index * 1.7) * 3;

        const y = position.y +
            Math.cos(seconds * 0.30 + index * 1.9) * 3;

        stars[index].style.left = x + "%";
        stars[index].style.top = y + "%";

        return { x, y };

    });

    // Make each line follow its two stars
    lines.forEach(line => {

        const from = Number(line.dataset.from);
        const to = Number(line.dataset.to);

        line.setAttribute("x1", positions[from].x);
        line.setAttribute("y1", positions[from].y);

        line.setAttribute("x2", positions[to].x);
        line.setAttribute("y2", positions[to].y);

    });

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

