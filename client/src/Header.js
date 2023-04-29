import { logout } from "./modules/authManager";

export const Header = ({ isLoggedIn, role }) => {
  return (
    <header className="border-2">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        {isLoggedIn && (
          <>
            <div className="flex text-3xl lg:flex-1">
              <a href="/">
                <span>Not Me Tube</span>
              </a>
            </div>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};
