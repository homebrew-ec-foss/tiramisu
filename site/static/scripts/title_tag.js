document.title = window.location.pathname == "/" ? "HSP PESUECC" : (() => {
    let path = window.location.pathname.split("/").pop()
    let title = path.charAt(0).toUpperCase() + path.slice(1).replace(".html", "")
    return `${title} | HSP PESUECC`
})()