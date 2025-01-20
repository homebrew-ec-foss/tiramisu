document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".featured-card");


    cards.forEach(card => {
        var href = card.getAttribute("href").slice(1);

        if (!href.includes(".html")) {
            href += ".html";
        }

        fetch(`/static/index.json`)
            .then(response => response.json())
            .then(data => {
                const eventData = data[href];
                if (eventData) {
                    console.log(card);

                    if (!eventData.Frontmatter.PreviewImage == "") {
                        card.querySelector(".featured-card-image").src = eventData.Frontmatter.PreviewImage;
                    } else {
                        card.querySelector(".featured-card-image").remove();
                    }

                    card.querySelector(".featured-card-title").innerHTML = eventData.Frontmatter.Title;
                    card.querySelector(".featured-card-date").innerHTML = eventData.Frontmatter.Date;
                    card.querySelector(".featured-card-desc").innerHTML = eventData.Frontmatter.Description;
                }
            })
            .catch(error => console.error('Error fetching the JSON:', error));
    });
});