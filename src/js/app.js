export default class App {
  constructor() {
    this.titleElement = document.getElementById("title");
    this.contentElement = document.getElementById("content");
    this.refreshButton = document.getElementById("refresh");

    this.init();
  }

  init() {
    this.registerServiceWorker();
    this.setupEventListeners();
    this.loadNews();
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        console.log("SW registered:", registration);
      });
    }
  }

  setupEventListeners() {
    this.refreshButton.addEventListener("click", () => this.loadNews());
  }

  showLoading() {
    this.contentElement.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    `;
  }

  showError() {
    this.contentElement.innerHTML = `
      <div class="error-message">
        <p>Не удалось загрузить данные</p>
        <p>Проверьте подключение</p>
        <p>и обновите страницу</p>
      </div>
    `;
  }

  async loadNews() {
    this.showLoading();

    try {
      const response = await fetch("/api/news");
      const news = await response.json();
      this.showNews(news);
    } catch (error) {
      console.error("Error:", error);
      this.showError();
    }
  }

  showNews(news) {
    let html = "";
    news.forEach((item) => {
      html += `
        <div class="news-item">
          <h2>${item.title}</h2>
          <p>${item.content}</p>
        </div>
      `;
    });
    this.contentElement.innerHTML = html;
  }
}
