document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("paneContainer");
  let activeResizer = null;
  let initialX = 0;
  let initialWidth = 0;
  let paneToResize = null;
  let totalWidth = container.offsetWidth;

  // Get all resizers and add event listeners
  const resizers = document.querySelectorAll(".pane-resizer");
  resizers.forEach((resizer) => {
    resizer.addEventListener("mousedown", startResize);
  });

  // Function to handle the start of resizing
  function startResize(e) {
    e.preventDefault();
    activeResizer = e.target;
    activeResizer.classList.add("active");
    const paneId = activeResizer.dataset.pane;
    paneToResize = document.getElementById(paneId);
    initialX = e.clientX;
    initialWidth = paneToResize.offsetWidth;

    // Add event listeners for mousemove and mouseup
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  }

  // Function to handle the resizing
  function resize(e) {
    if (!activeResizer) return;

    // Calculate the new width
    const dx = e.clientX - initialX;
    const newWidth = initialWidth + dx;

    // Apply the new width, ensuring it's at least the minimum width
    if (newWidth >= 100) {
      paneToResize.style.width = newWidth + "px";
      paneToResize.style.minWidth = newWidth + "px"; // Add min-width to maintain size in flex context
      paneToResize.style.flexGrow = 0; // Prevent automatic growth
      paneToResize.style.flexShrink = 0; // Prevent automatic shrinking

      // If it's the last pane with a resizer, adjust the width of the last pane
      if (paneToResize.id === "pane2") {
        const lastPane = document.getElementById("pane3");
        const pane1Width = document.getElementById("pane1").offsetWidth;
        const remainingWidth = totalWidth - pane1Width - newWidth;

        if (remainingWidth >= 100) {
          lastPane.style.width = `${remainingWidth}px`;
          lastPane.style.flexGrow = 1; // Allow last pane to take remaining space
        }
      }

      // If it's the first pane, adjust the width of the last pane
      if (paneToResize.id === "pane1") {
        const lastPane = document.getElementById("pane3");
        const pane2Width = document.getElementById("pane2").offsetWidth;
        const remainingWidth = totalWidth - newWidth - pane2Width;

        if (remainingWidth >= 100) {
          lastPane.style.width = `${remainingWidth}px`;
          lastPane.style.flexGrow = 1; // Allow last pane to take remaining space
        }
      }
    }
  }

  // Function to handle the end of resizing
  function stopResize() {
    if (activeResizer) {
      activeResizer.classList.remove("active");
    }
    activeResizer = null;
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
    document.body.style.cursor = "default";
  }

  // Double-click to collapse/expand pane
  resizers.forEach((resizer) => {
    resizer.addEventListener("dblclick", function (e) {
      const paneId = e.target.dataset.pane;
      const pane = document.getElementById(paneId);

      if (pane.dataset.prevWidth) {
        // Restore previous width
        pane.style.width = pane.dataset.prevWidth;
        pane.style.minWidth = pane.dataset.prevWidth;
        pane.dataset.prevWidth = "";
      } else {
        // Collapse to minimum
        pane.dataset.prevWidth = pane.style.width;
        pane.style.width = "50px";
        pane.style.minWidth = "50px";
      }

      // Recalculate the width for the last pane
      const pane1Width = document.getElementById("pane1").offsetWidth;
      const pane2Width = document.getElementById("pane2").offsetWidth;
      const lastPane = document.getElementById("pane3");
      const remainingWidth = totalWidth - pane1Width - pane2Width;

      if (remainingWidth >= 100) {
        lastPane.style.width = `${remainingWidth}px`;
        lastPane.style.flexGrow = 1; // Allow last pane to take remaining space
      }
    });
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    totalWidth = container.offsetWidth;

    // Recalculate the width for the last pane
    const pane1Width = document.getElementById("pane1").offsetWidth;
    const pane2Width = document.getElementById("pane2").offsetWidth;
    const lastPane = document.getElementById("pane3");
    const remainingWidth = totalWidth - pane1Width - pane2Width;

    if (remainingWidth >= 100) {
      lastPane.style.width = `${remainingWidth}px`;
      lastPane.style.flexGrow = 1;
    }
  });
  
  // Initial setup for flexbox
  document.getElementById("pane1").style.flexGrow = 0;
  document.getElementById("pane1").style.flexShrink = 0;
  document.getElementById("pane2").style.flexGrow = 0;
  document.getElementById("pane2").style.flexShrink = 0;
  document.getElementById("pane3").style.flexGrow = 1;
});
