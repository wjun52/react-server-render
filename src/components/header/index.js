import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

class Header extends PureComponent{
    render(){
        const { title, description, keywords } = this.props
        return (
            <Helmet>
                { title && <title>{title}</title> }
                { description && <meta name="description" content={description} /> }
                { keywords && <meta name="keywords" content={keywords} /> }
            </Helmet>
        )
    }
}

export default Header