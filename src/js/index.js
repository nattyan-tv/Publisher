const ipcRenderer = window.requires.ipcRenderer
let config;

window.onload = async () => {
    const main_content = document.getElementById("main_content")
    config = await ipcRenderer.invoke("load_config");
    let COUNT = 0;
    for (const repo_url of config.repository) {
        const temp = document.getElementById("repository_temp")
        const clone = document.importNode(temp.content, true);
        // const data = await ipcRenderer.invoke("get_repository", repo_url);
        const xhr = new XMLHttpRequest();
        xhr.open("GET", repo_url, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    /// HTML対応表
                    const NAVIGATION_TITLE = 0;       // 0: レポジトリタイトル
                    const NAVIGATION_APPLICATION = 1; // 1: <h3>Applications</h3>
                    const APPLICATIONS = 2;           // 2: アプリ一覧
                    const NAVIGATION_NEWS = {[false]: 3, [true]: 4};        // 3: <h3>News</h3>
                    const NEWS = {[false]: 4, [true]: 5};                   // 4: ニュース一覧

                    const repo_data = JSON.parse(xhr.responseText);

                    clone.firstElementChild.children[NAVIGATION_TITLE].innerHTML = repo_data.title;

                    let more_view = {app: false, news: false};

                    if ("application" in repo_data) {
                        // アプリケーション用
                        if (repo_data.application.length > 3) {
                            repo_data.application = repo_data.application.slice(0, 3)
                            more_view.app = true;
                        }
                        for (const item of repo_data.application) {
                            if (item.type === "application") {
                                const application = document.importNode(document.getElementById("application_temp").content, true);
                                application.firstElementChild.addEventListener("click", () => { alert(item.description) })
                                application.firstElementChild.children[0].src = item.icon_url;
                                application.firstElementChild.children[0].alt = item.title;
                                application.firstElementChild.children[1].innerHTML = item.title;
                                clone.firstElementChild.children[APPLICATIONS].appendChild(application);
                            }
                        }
                        if (more_view.app) {
                            clone.firstElementChild.children[APPLICATIONS].insertAdjacentHTML("afterEnd", `<div style='text-align: center;'><a onclick='viewMore("application", ${COUNT})'>さらに表示...</a></div>`)
                        }
                    }
                    else {
                        clone.firstElementChild.children[NAVIGATION_APPLICATION].innerHTML = "";
                    }

                    if ("news" in repo_data) {
                        // ニュース用
                        if (repo_data.news.length > 3) {
                            repo_data.news = repo_data.news.slice(0, 3)
                            more_view.news = true;
                        }
                        for (const item of repo_data.news) {
                            if (item.type === "news") {
                                const news = document.importNode(document.getElementById("news_temp").content, true);
                                const descriptions = item.description.split("\n");
                                news.firstElementChild.addEventListener("click", () => { alert(item.description, item.title) })
                                news.firstElementChild.children[0].innerHTML = item.title;
                                news.firstElementChild.children[1].innerHTML = descriptions.length > 1 ? item.description.split("\n")[0] + "..." : item.description.split("\n")[0];
                                clone.firstElementChild.children[NEWS[more_view.app]].appendChild(news);
                            }
                        }
                        if (more_view.news) {
                            clone.firstElementChild.children[NEWS[more_view.app]].insertAdjacentHTML("afterEnd", `<div style='text-align: center;'><a onclick='viewMore("news", ${COUNT})'>さらに表示...</a></div>`)
                        }
                    }
                    else {
                        clone.firstElementChild.children[NAVIGATION_NEWS[more_view.app]].innerHTML = "";
                    }

                    /// コンテンツを配置する
                    main_content.appendChild(clone);
                } else {
                    console.warn(xhr.statusText);
                }
            }
            else {
                console.warn("Unknown error.")
            }
            COUNT++;
        }
        xhr.onerror = function (e) {
            console.warn(xhr.statusText);
            COUNT++;
        }
        xhr.send(null);
    }
}

function viewMore(content_type, count) {
    console.log(content_type, count)
    alert(count);
}
