import React from "react";
import { Logo } from "./common/Logo";

export const Footer = () => {
  return (
    <footer className="root">
      <section className="section flex">
        <div className="section">
          <Logo style={{ width: "4rem" }} />
        </div>
      </section>
    </footer>
  );
};
