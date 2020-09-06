import React, { FC, useState, useEffect, } from 'react';
import { Row, Input, Button, Col, Divider, Empty, } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import style from './index.module.css';

interface IBoard {

    mode: string,
}

const Board = (props: IBoard) => {
    const [signalBandwidth, setSignalBandwidth] = useState('');
    const [spreadSpectrumFactor, setSpreadSpectrumFactor] = useState('');
    const [workingFrequency, setWorkingFrequency] = useState('');
    const [transmittingPower, setTransmittingPower] = useState('');
    const [codingRate, setCodingRate] = useState('');
    const [preambleSize, setPreambleSize] = useState('');
    const [result, setResult] = useState('');

    const { mode } = props;

    useEffect(() => {
        // 清空表单中的所有的值
        clearHandleClick();
    }, [mode]);

    const signalBandwidthHandleChange = (ev: any) => {
        setSignalBandwidth(ev.target.value);
    };

    const spreadSpectrumFactorHandleChange = (ev: any) => {
        setSpreadSpectrumFactor(ev.target.value);
    };

    const workingFrequencyHandleChange = (ev: any) => {
        setWorkingFrequency(ev.target.value);
    };

    const transmittingPowerHandleChange = (ev: any) => {
        setTransmittingPower(ev.target.value);
    };

    const setCodingRateHandleChange = (ev: any) => {
        setCodingRate(ev.target.value);
    };

    const preambleSizeHandleChange = (ev: any) => {
        setPreambleSize(ev.target.value);
    };

    const resultHandleChange = (ev: any) => {
        setResult(ev.target.value);
    };

    const calculationHandleClick = () => {

        let MTOP: {
            _signalBandwidth: number,
            _spreadSpectrumFactor: number,
            _workingFrequency: number,
            _transmittingPower: number,
            _codingRate: number,
            _preambleSize: number,
        } = {
            _signalBandwidth: Number(signalBandwidth),
            _spreadSpectrumFactor: Number(spreadSpectrumFactor),
            _workingFrequency: Number(workingFrequency),
            _transmittingPower: Number(transmittingPower),
            _codingRate: Number(codingRate),
            _preambleSize: Number(preambleSize),
        };
        let {
            _signalBandwidth,
            _spreadSpectrumFactor,
            _workingFrequency,
            _transmittingPower,
            _codingRate,
            _preambleSize,
        } = MTOP;

        /*
            - _signalBandwidth【信号带宽】
            - _spreadSpectrumFactor【扩频因子】
            - _workingFrequency【工作频率】
            - _transmittingPower【发射功率】
            - _codingRate【编码率】
            - _preambleSize【前导码长度】
        */
        let res = 0;

        if (mode === "TransmissionDistance") { // 选择第一项【传输距离计算】
            console.log(_signalBandwidth, _spreadSpectrumFactor, _workingFrequency, _transmittingPower);
            // 逻辑书写区域
            res = _signalBandwidth + _spreadSpectrumFactor + _workingFrequency + _transmittingPower;
        } else if (mode === "SendingTime") { // 选择第二项【发送时长计算】
            console.log(_signalBandwidth, _spreadSpectrumFactor, _codingRate, _preambleSize);
            // 逻辑书写区域
            res = _signalBandwidth * _spreadSpectrumFactor * _codingRate * _preambleSize;
        }

        setResult(`${res}`);
    };

    const clearHandleClick = () => {
        setSignalBandwidth('');
        setSpreadSpectrumFactor('');
        setWorkingFrequency('');
        setTransmittingPower('');
        setCodingRate('');
        setPreambleSize('');
        setResult('');
    };

    const renderInput = (mode: string) => {

        let reactNode = null;

        switch (mode) {
            case "TransmissionDistance":
                reactNode = (
                    <>
                        <Col span={5}>
                            <label htmlFor="" style={{
                                display: "inline-block"
                            }}>
                                工作频率:
                        <Input value={workingFrequency} onChange={workingFrequencyHandleChange} />
                            </label>
                        </Col>
                        <Col span={5}>
                            <label htmlFor="" style={{
                                display: "inline-block"
                            }}>
                                发射功率:
                        <Input value={transmittingPower} onChange={transmittingPowerHandleChange} />
                            </label>
                        </Col>
                    </>
                );
                break;
            case "SendingTime":
                reactNode = (
                    <>
                        <Col span={5}>
                            <label htmlFor="" style={{
                                display: "inline-block"
                            }}>
                                编码率:
                        <Input value={codingRate} onChange={setCodingRateHandleChange} />
                            </label>
                        </Col>
                        <Col span={5}>
                            <label htmlFor="" style={{
                                display: "inline-block"
                            }}>
                                前导码长度:
                        <Input value={preambleSize} onChange={preambleSizeHandleChange} />
                            </label>
                        </Col>
                    </>
                );
                break;
            default:
                reactNode = (
                    <></>
                );
                break;
        }

        return reactNode;
    };


    return (
        <div className={style.container}>

            {
                mode === "TransmissionDistance" || mode === "SendingTime" ? (
                    <>
                        <div className={style.input}>
                            <Divider orientation="left" className={style.divider}>输入</Divider>
                            <Row gutter={15}>
                                <Col span={5}>
                                    <label htmlFor="" style={{
                                        display: "inline-block"
                                    }}>
                                        信号带宽:
                        <Input value={signalBandwidth} onChange={signalBandwidthHandleChange} />
                                    </label>
                                </Col>
                                <Col span={5}>
                                    <label htmlFor="" style={{
                                        display: "inline-block"
                                    }}>
                                        扩频因子:
                        <Input value={spreadSpectrumFactor} onChange={spreadSpectrumFactorHandleChange} />
                                    </label>
                                </Col>
                                {
                                    renderInput(mode)
                                }
                                <Col span={2}>

                                    <label htmlFor="" style={{
                                        display: "inline-block"
                                    }}>
                                        &nbsp;
                                        <Button
                                            type="primary"
                                            style={{
                                                display: 'block'
                                            }}
                                            onClick={
                                                calculationHandleClick
                                            }
                                        >
                                            计算
                                        </Button>
                                    </label>
                                </Col>
                                <Col span={2}>

                                    <label htmlFor="" style={{
                                        display: "inline-block"
                                    }}>
                                        &nbsp;
                                        <Button
                                            type="primary"
                                            style={{
                                                display: 'block'
                                            }}
                                            onClick={clearHandleClick}
                                        >
                                            清空
                                        </Button>
                                    </label>
                                </Col>
                            </Row>

                        </div>
                        <div className={style.output}>
                            <Divider orientation="left" className={style.divider}>输出</Divider>
                            <Row gutter={5}>
                                <Col span={22}>
                                    <label htmlFor="" style={{
                                        display: "inline-block"
                                    }}>
                                        结果:
                        <Input value={result} onChange={resultHandleChange} />
                                    </label>
                                </Col>
                            </Row>
                        </div>
                    </>
                ) : (
                        <Empty />
                    )
            }



        </div>
    );
};

export default Board;