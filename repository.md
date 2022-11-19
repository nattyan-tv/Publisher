# Repository
`Publisher`でアプリケーションやニュースを配信するには「レポジトリ」を作成する必要があります。（GitHubレポジトリのことではありません。）  
レポジトリURLをユーザーが追加することで、そのレポジトリのアプリケーションやニュースをユーザーが取得できるようになります。

## レポジトリ
レポジトリの中身は、1つの単純なJSONファイルです。  
これを自前のサーバーまたは`GitHub Pages`等を用いて配信することが出来れば、あなたのレポジトリの完成です！

### JSONの中身
JSONファイルは、4部構成に分かれています。

### レポジトリのタイトル
これは、そのレポジトリのタイトルを表します。  
例えば、あなたの開発グループの名前やメインで配信するアプリの名前など...  
これは頻繁に変えることが推奨されていません。

```json
"title": "レポジトリのタイトル"
```

### レポジトリ情報
ここには、そのレポジトリの開発者やホームページ等の情報を入れます。  
レポジトリの詳細を知る手立てです。

```json
{
    "author": "開発者、配信者",
    "homepage": "ホームページ",
    "description": "レポジトリの説明\n（複数行可）"
}
```

### アプリケーション
ここには、配信したいアプリケーションの情報を入れます。  
この中にはアプリタイトルやアイコン画像のURL、ファイルのURL等が含まれています。

```json
[
    {
        "title": "アプリのタイトル",
        "id": "アプリの管理ID",
        "version": "アプリのバージョン",
        "type": "application",
        "date": 最終更新時間(UNIX時間),
        "icon_url": "アプリのアイコン画像",
        "description": "アプリの説明\n（複数行可）",
        "url": "アプリケーションファイルのURL",
        "images": [
            "アプリのサンプル画像"
        ]
    }
]
```

### ニュース
ここには、配信したいニュースの情報を入れます。  
アプリのアップデートなどがあれば、ここに記載してあげましょう。

```json
[
    {
        "title": "ニュースのタイトル",
        "type": "news",
        "date": 日付(UNIX時間),
        "description": "ニュース本文"
    }
]
```


### サンプル

```json
{
    "title": "Publisher",
    "info": {
        "author": "nattyan-tv",
        "homepage": "https://github.com/nattyan-tv/Publisher",
        "description": "\"Publisher\" is developed by nattyan-tv using JavaScript(Electron)\nThanks for using!"
    },
    "application": [
        {
            "title": "Publisher",
            "id": "com.nattyantv.publisher",
            "version": "v0.9.1",
            "type": "application",
            "date": 1667723550,
            "icon_url": "https://example.com/icon.jpg",
            "description": "アプリとニュースの配信を円滑に。\nPublisher is easy to publish your application and news.",
            "url": "https://example.com/publisher.zip",
            "images": [
                "https://example.com/sample1.jpg"
            ]
        }
    ]
}
```

## 動的サーバー
1つのJSONファイルで管理するのが憂鬱ですか？  
例えばPython等を使用して、JSONファイルを用意せずとも、動的にJSONレスポンスを返すサーバーを作れば、便利に管理ができるかもしれません。  
そうすれば、アプリの説明文章も別ファイルで用意することも出来るでしょう。
