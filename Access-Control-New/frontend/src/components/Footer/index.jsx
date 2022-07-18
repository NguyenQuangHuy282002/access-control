import { Footer } from 'antd/lib/layout/layout';

AppFooter.propTypes = {
    
};

function AppFooter(props) {
    return (
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
    );
}

export default AppFooter;