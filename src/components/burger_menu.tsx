import * as React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

const sidebar = {
  position: 'relative' as 'relative',
  height: '100vh',
  width: '0px',
};

interface BurgerMenuProps {
  title: string,
}

const burgerButtonStyles = {
  position: 'fixed' as 'fixed',
  margin: '10px',
  zIndex: 1044,
}

export function BurgerMenu(props: React.PropsWithChildren<BurgerMenuProps>) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setOpen(open => !open)}
        style={burgerButtonStyles}
      >
        <FaBars />
      </Button>
      <Offcanvas show={open} onHide={() => setOpen(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{props.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {props.children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

