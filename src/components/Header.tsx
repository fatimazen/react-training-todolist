import "./Header.css";

type HeaderProps = {};
const title = "To do list";
export const Header = ({ }: HeaderProps) =>
  <div className="header">
    <h1>{title}</h1>
  </div>;
