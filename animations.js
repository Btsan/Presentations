function screenToSvg(svg, x, y) {
  const pt = svg.createSVGPoint();
  pt.x = x; pt.y = y;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function drawJoinLines() {
  const svg = document.querySelector('#join-slide svg');
  svg.innerHTML = '';

  const pairs = [
    { left: '#left-row-2', right: '#right-row-2', color: 'var(--palered)' },   // red
    { left: '#left-row-3', right: '#right-row-3', color: 'var(--palecyan)' }    // green
  ];


  pairs.forEach(({ left, right, color }) => {
    const leftRow  = document.querySelector(left);
    const rightRow = document.querySelector(right);

    // Color each cell in the left and right rows
    leftRow.querySelectorAll('td').forEach(td => {
        td.style.backgroundColor = color;
    });
    rightRow.querySelectorAll('td').forEach(td => {
        td.style.backgroundColor = color;
    });


    const ra = leftRow.getBoundingClientRect();
    const rb = rightRow.getBoundingClientRect();

    // Map screen‐space midpoints into SVG‐space
    const gap = 8; // gap from arrows to table border
    const p1 = screenToSvg(svg, ra.right + gap,  ra.top + ra.height/2);
    const p2 = screenToSvg(svg, rb.left - gap,   rb.top + rb.height/2);

    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '3');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);

    // Trigger fade-in
    requestAnimationFrame(() => {
        line.style.opacity = 1;
    });

  });
}

function drawHashLines(slideId) {
  const svg = document.querySelector(`#${slideId} svg`);
  svg.innerHTML = '';

  const pairs = [
    { keys: '#left-ids', hashes: '#left-hashes' },
    { keys: '#right-ids', hashes: '#right-hashes' }
  ];


  pairs.forEach(({ keys, hashes }) => {
    const key_table  = document.querySelector(keys);
    const hash_table = document.querySelector(hashes); 

    const ra = key_table.getBoundingClientRect();
    const rb = hash_table.getBoundingClientRect();

    // Map screen‐space midpoints into SVG‐space
    const p1 = screenToSvg(svg, ra.left + ra.width/2,  ra.bottom + 8);
    const p2 = screenToSvg(svg, ra.left + ra.width/2,   rb.top - 16);

    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '3');
    // line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('marker-end', "url(#arrowhead)")
    svg.appendChild(line);

    // Trigger fade-in
    requestAnimationFrame(() => {
        line.style.opacity = 1;
    });

  });
}

function drawHashLines2() {
  const svg = document.querySelector('#fast-agms-slide svg');
  svg.innerHTML = '';

  const pairs = [
    { keys: '#left-ids-2', hashes: '#left-hashes-2' },
    { keys: '#middle-ids-2', hashes: '#middle-hashes-2' },
    { keys: '#right-ids-2', hashes: '#right-hashes-2' }
  ];


  pairs.forEach(({ keys, hashes }) => {
    const key_table  = document.querySelector(keys);
    const hash_table = document.querySelector(hashes); 

    const ra = key_table.getBoundingClientRect();
    const rb = hash_table.getBoundingClientRect();

    // Map screen‐space midpoints into SVG‐space
    const p1 = screenToSvg(svg, ra.left + ra.width/2,  ra.bottom + 8);
    const p2 = screenToSvg(svg, ra.left + ra.width/2,   rb.top - 16);

    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '3');
    // line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('marker-end', "url(#arrowhead)")
    svg.appendChild(line);

    // Trigger fade-in
    requestAnimationFrame(() => {
        line.style.opacity = 1;
    });

  });
}

function drawSketches() {
  const svg = document.querySelector('#sketch-slide svg');
  svg.innerHTML = '';

  const anchor = document.querySelector('#sketch-slide #data-x');
  const anchorRect = anchor.getBoundingClientRect();
  center = screenToSvg(svg, anchorRect.left - 8, anchorRect.top + anchorRect.height / 2);

  leftCounters = [ '#agms-1', '#agms-2', '#agms-3', '#agms-4', '#agms-5' ]

  // Draw left-side counters and arrows
  leftCounters.forEach((counter) => {
    const sketch = document.querySelector(counter).getBoundingClientRect();
    const target = screenToSvg(svg, sketch.right + 16, sketch.top + sketch.height/2);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', center.x);
    line.setAttribute('y1', center.y);
    line.setAttribute('x2', target.x);
    line.setAttribute('y2', target.y);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('marker-end', 'url(#arrowhead)');
    svg.appendChild(line);
  });

  center = screenToSvg(svg, anchorRect.right + 8, anchorRect.top + anchorRect.height / 2);

  const sketch = document.querySelector('#fast-agms').getBoundingClientRect();
  const target = screenToSvg(svg, sketch.left - 16, sketch.top + sketch.height/2);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', center.x);
  line.setAttribute('y1', center.y);
  line.setAttribute('x2', target.x);
  line.setAttribute('y2', target.y);
  line.setAttribute('stroke', 'black');
  line.setAttribute('stroke-width', '1');
  line.setAttribute('marker-end', 'url(#arrowhead)');
  svg.appendChild(line);

  // // Draw right-side array and arrow
  // const arrayX = window.innerWidth * rightArrayXPercent;
  // const arrayY = center.y;
  // const arrayCorner = screenToSvg(svg, arrayX, arrayY);

  // const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  // rect.setAttribute('x', arrayCorner.x - 40);
  // rect.setAttribute('y', arrayCorner.y - 20);
  // rect.setAttribute('width', 80);
  // rect.setAttribute('height', 40);
  // rect.setAttribute('fill', '#eee');
  // rect.setAttribute('stroke', 'black');
  // svg.appendChild(rect);

  // for (let i = 0; i < 5; i++) {
  //   const dotX = arrayX - 30 + i * 15;
  //   const dot = screenToSvg(svg, dotX, arrayY);
  //   const dotEl = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  //   dotEl.setAttribute('cx', dot.x);
  //   dotEl.setAttribute('cy', dot.y);
  //   dotEl.setAttribute('r', 3);
  //   dotEl.setAttribute('fill', 'black');
  //   svg.appendChild(dotEl);
  // }

  // const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  // arrow.setAttribute('x1', center.x);
  // arrow.setAttribute('y1', center.y);
  // arrow.setAttribute('x2', arrayCorner.x - 40);
  // arrow.setAttribute('y2', arrayCorner.y);
  // arrow.setAttribute('stroke', 'black');
  // arrow.setAttribute('stroke-width', '2');
  // arrow.setAttribute('marker-end', 'url(#arrowhead)');
  // svg.appendChild(arrow);
}

/* \definecolor{palecyan}{RGB}{204, 238, 255}
\definecolor{palegreen}{RGB}{204, 221, 170}
\definecolor{palered}{RGB}{255, 204, 204} */