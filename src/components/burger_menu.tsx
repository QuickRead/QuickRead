import * as React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from 'react-bootstrap';

export function BurgerMenu(props: React.PropsWithChildren<Object>) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(open => !open)}>
        <GiHamburgerMenu />
      </Button>
      {open && props.children}
    </>
  );
}
