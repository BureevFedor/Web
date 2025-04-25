import Canvas from './Canvas';
import Table from './Table';

import InputPanel from './InputPanel';

const InputForm = () => {
    return (
        <div>
            <div className="wrapper">
		        <div className="grid">
                
                    <Canvas />

                    <div className="container">
                        <div className="pad_bot">
                            <InputPanel />
                        </div>
                    </div>
                    
                    <Table />
                
                </div>
            </div>
        </div>
    );
}

export default InputForm;