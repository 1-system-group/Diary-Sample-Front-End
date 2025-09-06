function Header() {
    return (
        <div>
              <header>
                <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark border-bottom mb-3 p-0 manage_theme">
                    <div class="container">
                        <a class="navbar-brand text-light">日記</a>
                        <button class="navbar-toggler text-light" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="navbar-collapse collapse">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <a class="nav-link text-light" asp-area="" asp-controller="Menu" asp-action="Index">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-light">プロフィール</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link text-light">設定</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-light" asp-area="" asp-controller="Manage" asp-action="Index">管理</a>
                                </li>
                            </ul>
                            <ul class="navbar-nav">
                                <form class="form-inline" asp-controller="Auth" asp-action="Logout" method="post" >
                                    <li class="nav-item">
                                        <button id="Logout" type="submit" class="nav-link btn btn-link text-light">ログアウト</button>
                                    </li>
                                </form>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
export default Header;
