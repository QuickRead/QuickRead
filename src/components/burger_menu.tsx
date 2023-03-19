import React from 'react';

interface BurgerMenuState {
}

interface BurgerMenuProps {
    sites: Array<Website>;
}

export class BurgerMenu extends React.Component<BurgerMenuProps, BurgerMenuState> {
    constructor(props: BurgerMenuProps) {
        super(props);
    }

    render() {
        // render list of links with buttons to add and remove
        return (
            <ul>
                {this.props.sites.map((site) => {
                    return (
                        <li>
                            <div>{site.link}</div>
                        </li>
                    );
                })
                }
            </ul>
        );
    }
}