console.log("Scroll redirect script loaded");

if (typeof window !== "undefined") {
	document.addEventListener("DOMContentLoaded", () => {
		console.log("DOM fully loaded and parsed");
		document.addEventListener("wheel", (event) => {
			console.log("Wheel event detected");
			if (event.deltaY > 0) {
				console.log("Redirecting to /galeria");
				window.location.href = "/galeria";
			}
		});
	});
}
