import React, { FC, useEffect, useState, } from 'react';
import { Menu, PageHeader, } from 'antd';
import { AppstoreOutlined, CalculatorOutlined } from '@ant-design/icons';

import style from './index.module.css';
import ContentPanel from '../../components/contentPanel';
import Board from './components/board';

const { SubMenu } = Menu;
const routes = [
    {
        path: '',
        breadcrumbName: 'Home',
    },
    {
        path: '',
        breadcrumbName: 'Calculation',
    },
    {
        path: '',
        breadcrumbName: 'index',
    },
];

const keys = {
    "TransmissionDistance": "传输距离计算",
    "SendingTime": "发送时长计算",
    "BatteryLife": "电池寿命计算",
    "GatewayCapacity": "网关容量计算",
    "GatewayTraffic": "网关流量计算",
};

// const modes = ;

const Home: FC = () => {

    const [current, setCurrent] = useState("TransmissionDistance");

    /**
     * @description 选择菜单项的回调
     * @param ev 事件源
     */
    const selectHandleClick = (ev: any) => {
        // 更新菜单选中状态
        setCurrent(ev.key);
    };


    return (
        <div className={style.homeContainer}>
            <div className={style.menu}>
                <Menu onClick={selectHandleClick} selectedKeys={[current]} mode="inline" theme="dark">
                    <SubMenu icon={<CalculatorOutlined />} title="计算">
                        {
                            Object.keys(keys).map((item, index) => <Menu.Item key={item}>{Object.values(keys)[index]}</Menu.Item>)
                        }
                    </SubMenu>
                </Menu>
            </div>
            <div className={style.content}>
                <div className={style.pageHeader}>
                    <PageHeader
                        className="site-page-header"
                        title="教育"
                        breadcrumb={{ routes }}
                        subTitle="这是一个关于计算的页面"
                    />
                </div>
                <div className={style.row}>
                    {
                        ContentPanel.show({
                            contentComponent: <Board mode={current} />,
                        })
                    }
                </div>
                <div className={style.footer}>
                    <div className={style.content}>
                        <span>
                            河北交通职业就数学院版权所有©2020
                    </span>
                        <span>
                            |
                    </span>
                        <span>
                            浙公网安备 33010902002564号
                    </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;