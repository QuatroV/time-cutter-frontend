import { createContext } from 'react';

const ImpExpContext = createContext({
    exportSvg: () => {},
});

export default ImpExpContext;