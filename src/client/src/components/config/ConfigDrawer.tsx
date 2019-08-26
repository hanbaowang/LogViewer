import React from "react";
import { Drawer } from "antd";
import { ConfigDrawerProps } from "../../type/Component";


export default function ConfigDrawer(props: ConfigDrawerProps) {
    const { visible, onClose } = props;
    const { refresh_time } = props.logConfig
    return (
        <div>
            <Drawer
                width={640}
                visible={visible}
                title="全局配置"
                closable={false}
                onClose={onClose}
            >
                {refresh_time}
            </Drawer>
        </div>
    );
}