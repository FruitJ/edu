import React, { FC, useState, useEffect, ReactElement, } from 'react';

import style from './index.module.css';

interface IContentPanel {

    contentComponent: ReactElement,
};

const ContentPanel = (props: IContentPanel) => {

    const { contentComponent, } = props;

    return (
        <div className={ style.container }>
            {contentComponent}
        </div>
    );
};

ContentPanel.show = (option: { contentComponent: ReactElement }) => {

    return (
        <ContentPanel {...option} />
    );
};

export default ContentPanel;