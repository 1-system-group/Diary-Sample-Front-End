import { useNavigate, Link } from "react-router-dom"

function Header() {

    const navigate = useNavigate()

    const manage = () => {
        navigate("/Manage");
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark border-bottom mb-3 p-0 manage_theme">
                    <div className="container">
                        <a className="navbar-brand text-light">日記</a>
                        <button className="navbar-toggler text-light" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    {/* TODO 遷移先未設定 */}
                                    <Link to="/" className="nav-link text-light" >Home</Link>
                                </li>
                                <li className="nav-item">
                                    {/* TODO 遷移先未設定 */}
                                    <Link to="/" className="nav-link text-light" >プロフィール</Link>
                                </li>
                                <li className="nav-item">
                                    {/* TODO 遷移先未設定 */}
                                    <Link to="/" className="nav-link text-light" >設定</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/Manage" className="nav-link text-light" >管理</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <form className="form-inline" asp-controller="Auth" asp-action="Logout" method="post" >
                                    <li className="nav-item">
                                        {/* TODO 遷移先未設定 */}
                                        <button id="Logout" type="submit" className="nav-link btn btn-link text-light">ログアウト</button>
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
