import Link from "next/link";
import { ReactNode } from "react";

type LinkOrText = {
  href?: string;
  target?: string;
  children: ReactNode;
};

function LinkOrText({ href, target, children }: LinkOrText) {
  if (!href) {
    return <span>{children}</span>;
  }
  return (
    <Link href={href} target={target}>
      {children}
    </Link>
  );
}

export { LinkOrText };
