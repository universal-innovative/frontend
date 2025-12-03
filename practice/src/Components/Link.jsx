export function Link({ to, children }) {
  const handleClick = (e) => {
    e.preventDefault();
    window.history.pushState({}, "", to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
