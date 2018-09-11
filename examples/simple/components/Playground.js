import React from 'react';
import Resizable from 're-resizable';
import styled from 'styled-components';
import { Textfit } from '../../../src';

const StyledTextfit = styled(Textfit)`
    height: 100%;
    overflow: hidden;
`;

export default class Playground extends React.Component {
    state = {
        text: 'Edit this text!',
        mode: 'multi',
        forceSingleModeWidth: true,
        resizable: false,
        resizeDimensions: {
            height: 400,
            width: 'auto'
        }
    }

    handleChangeText = (e) => {
        const text = e.target.value;
        this.setState({ text });
    }

    handleChangeMode = (e) => {
        const mode = e.target.value;
        this.setState({ mode });
    }

    handleChangeForceWidth = (e) => {
        const forceSingleModeWidth = e.target.checked;
        this.setState({ forceSingleModeWidth });
    }

    handleResizableToggle = (e) => {
        const resizable = e.target.checked;
        this.setState({ resizable });
    }

    onResizeStop = (e, direction, ref) => {
        const { offsetWidth, offsetHeight } = ref;
        this.setState({
            resizeDimensions: {
                height: offsetHeight,
                width: offsetWidth
            }
        });
    }

    render() {
        const {
            text,
            mode,
            forceSingleModeWidth,
            resizable,
            resizeDimensions
        } = this.state;
        const content = resizable
            ? Resizable
            : 'div';
        const StyledContent = styled(content)`
            margin-bottom: 1em;
        `;
        const contentProps = resizable
            ? {
                size: resizeDimensions,
                maxWidth: '100%',
                onResizeStop: this.onResizeStop,
                minHeight: 75
            }
            : {
                style: { height: '400px' }
            };

        return (
            <div>
                <h2 className="headline">Playground</h2>
                <div className="row">
                    <div className="column-100">
                        <StyledContent
                            {...contentProps}>
                            <StyledTextfit
                                resizable={resizable}
                                mode={mode}
                                forceSingleModeWidth={forceSingleModeWidth}
                                max={500}
                                className="box box-fat">
                                {text}
                            </StyledTextfit>
                        </StyledContent>
                    </div>
                    <div className="column-100 playground">
                        <textarea rows="8" value={text} onChange={this.handleChangeText} />
                        <div className="row">
                            <div className="column-50"><strong>Mode</strong></div>
                            <div className="column-50">
                                <select value={mode} onChange={this.handleChangeMode}>
                                    <option value="multi">Multi line</option>
                                    <option value="single">Single line</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column-50">
                                <strong>Force width</strong><br />
                                <small>(only single mode)</small>
                            </div>
                            <div className="column-50">
                                <label>
                                    <input
                                        disabled={mode === 'multi'}
                                        type="checkbox"
                                        value={true}
                                        checked={forceSingleModeWidth}
                                        onChange={this.handleChangeForceWidth} />
                                    {' '}
                                    Force width
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column-50">
                                <strong>Resizable</strong><br />
                            </div>
                            <div className="column-50">
                                <label>
                                    <input
                                        type="checkbox"
                                        value={true}
                                        checked={resizable}
                                        onChange={this.handleResizableToggle} />
                                    {' '}
                                    Resizable
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
