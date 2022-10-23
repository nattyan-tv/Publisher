const ipcRenderer = window.requires.ipcRenderer
let config;

window.onload = async () => {
    const main_content = document.getElementById("main_content")
    config = await ipcRenderer.invoke("load_config");
    for (const repo_url of config.repository) {
        const temp = document.getElementById("repository_temp");
        const clone = document.importNode(temp.content, true);
        const data = await ipcRenderer.invoke("get_repository", repo_url);
        console.log(data);
        // console.log(content)
        // console.log(status_code);
        // console.log(repo_data);
        // if (status_code === 1) {
        //     main_content.insertAdjacentElement("beforeend", clone);
        // }
    }
}
