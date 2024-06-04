import React from 'react';
import "../cart-page/index.scss";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineCloseCircle } from "react-icons/ai";

function AddToCart() {
    return (
        <div className='cart-content'>
            <div className="card">
                <div className="row">
                    <div className="col-md-8 cart">
                        <div className="title">
                            <div className="row">
                                <div className="col"><h4><b>Shopping Cart</b></h4></div>
                                <div className="col align-self-center text-right text-muted">3 items</div>
                            </div>
                        </div>
                        <div className="row border-top border-bottom">
                            <div className="row main align-items-center">
                                <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/1GrakTl.jpg" /></div>
                                <div className="col">
                                    <div className="row text-muted">Shirt</div>
                                    <div className="row">Cotton T-shirt</div>
                                </div>
                                <div className="col">
                                    <button className='quantity'><AiOutlineMinus /></button>
                                    <input className='input-quantity' type="number" />
                                    <button className='quantity'><AiOutlinePlus /></button>
                                </div>
                                <div className="col">€ 44.00 <span className="close">✕</span></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="row main align-items-center">
                                <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/ba3tvGm.jpg" /></div>
                                <div className="col">
                                    <div className="row text-muted">Shirt</div>
                                    <div className="row">Cotton T-shirt</div>
                                </div>
                                <div className="col">
                                    <button className='quantity'><AiOutlineMinus /></button>
                                    <input className='input-quantity' type="number" />
                                    <button className='quantity'><AiOutlinePlus /></button>
                                </div>
                                <div className="col">€ 44.00 <span className="close">✕</span></div>
                            </div>
                        </div>
                        <div className="row border-top border-bottom">
                            <div className="row main align-items-center">
                                <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/pHQ3xT3.jpg" /></div>
                                <div className="col">
                                    <div className="row text-muted">Shirt</div>
                                    <div className="row">Cotton T-shirt</div>
                                </div>
                                <div className="col">
                                    <button className='quantity'><AiOutlineMinus /></button>
                                    <input className='input-quantity' type="number" />
                                    <button className='quantity'><AiOutlinePlus /></button>

                                </div>
                                <div className="col">€ 44.00
                                <span className="close"><AiOutlineCloseCircle /></span></div>
                                {/* <button className='close'></button> */}
                            </div>
                        </div>
                        <div className="back-to-shop"><a href="/diamond-page">←Back to shop</a></div>
                    </div>
                    <div className="col-md-4 summary">
                        <div><h5><b>Summary</b></h5></div>
                        <hr />
                        <div className="row">
                            <div className="col" style={{ paddingLeft: 0 }}>ITEMS 3</div>
                            <div className="col text-right">€ 132.00</div>
                        </div>
                        <form>
                            <p>SHIPPING</p>
                            <select>
                                <option className="text-muted">Standard-Delivery- €5.00</option>
                                <option className="text-muted">Payment Online</option>
                            </select>
                            <p>GIVE CODE</p>
                            <input id="code" placeholder="Enter your code" />
                        </form>
                        <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
                            <div className="col">TOTAL PRICE</div>
                            <div className="col text-right">€ 137.00</div>
                        </div>
                        <button className="btn">CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddToCart;
