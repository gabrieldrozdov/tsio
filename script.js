// Scrollbar
let html = document.querySelector('html');
let container = document.querySelector('.container');
container.addEventListener('scroll', (e) => {
	// Calculate scroll percentage
	let scrollX = container.scrollLeft / (container.scrollWidth - window.innerWidth);

	// Move handle to match
	let scrollbarHandle = document.querySelector('.scrollbar-handle');
	scrollbarHandle.style.left = `calc(${scrollX*100} * 1% - (${scrollX*100} * 40px / 100))`;
})
let scrollBar = document.querySelector('.scrollbar');
let scrolling = false;
scrollBar.addEventListener('mousedown', (e) => {
	scrolling = true;
	html.dataset.scrolling = true;
	let posX = e.clientX / window.innerWidth;
	container.scrollLeft = Math.round(posX*(container.scrollWidth - window.innerWidth));
})
scrollBar.addEventListener('touchstart', (e) => {
	scrolling = true;
	html.dataset.scrolling = true;
	let posX = e.touches[0].clientX / window.innerWidth;
	container.scrollLeft = Math.round(posX*(container.scrollWidth - window.innerWidth));
})
window.addEventListener('mousemove', (e) => {
	if (scrolling) {
		let posX = e.clientX / window.innerWidth;
		container.scrollLeft = Math.round(posX*(container.scrollWidth - window.innerWidth));
	}
})
window.addEventListener('touchmove', (e) => {
	if (scrolling) {
		let posX = e.touches[0].clientX / window.innerWidth;
		container.scrollLeft = Math.round(posX*(container.scrollWidth - window.innerWidth));
	}
})
window.addEventListener("mouseup", () => {
	scrolling = false;
	html.dataset.scrolling = false;
})
window.addEventListener("touchend", () => {
	scrolling = false;
	html.dataset.scrolling = false;
})

// Override default nav link behavior
for (let navLink of document.querySelectorAll('.nav-link')) {
	navLink.addEventListener('click', (e) => {
		e.preventDefault();
		let targetHref = navLink.href.split('#')[1];
		let target = document.querySelector(`#${targetHref}`);
		container.scrollTo({
			left: target.getBoundingClientRect().left - container.getBoundingClientRect().left + container.scrollLeft - 420,
			behavior: 'smooth'
		});
	})
}