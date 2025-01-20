document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".events-card");

    cards.forEach(card => {
        const href = card.getAttribute("href").slice(1);

        fetch(`/static/index.json`)
            .then(response => response.json())
            .then(data => {
                const eventData = data[href];
                if (eventData) {
                    card.querySelector(".event-card-title").innerHTML = eventData.Frontmatter.Title;
                    card.querySelector(".event-card-desc").innerHTML = eventData.Frontmatter.Description;
                    card.querySelector(".event-card-date").innerHTML = eventData.Frontmatter.Date;
                }
            })
            .catch(error => console.error('Error fetching the JSON:', error));
    });
});