import axios from 'axios';

export class DummyDataSvc {

    getProductsSmall() {
        return axios.get('assets/demo/data/TaskDummy.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('assets/demo/data/TaskDummy.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/TaskDummy.json').then(res => res.data.data);
    }
}