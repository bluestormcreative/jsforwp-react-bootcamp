import React from 'react';
import QRCode from 'qrcode.react';

const EventQR = ({ qrvalue }) => {
	return <QRCode value={qrvalue} />;
};
export default EventQR;
