import React from 'react';
export interface DraggerProps {
    onFile: (files: FileList) => void;
}
export declare const Dragger: React.FC<DraggerProps>;
