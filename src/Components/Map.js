import React, { Component } from 'react';
import "./Map.css";
import LoadingScreen from 'react-loading-screen';
import firebase from 'firebase';
import { Config } from './config';

class Map extends Component {

    constructor(props) {
        super(props)

        this.map = firebase.initializeApp(Config);
        this.db = this.map.database().ref().child('node-client');

        this.state = {

            x: 0,
            y: 0,

            canvasRef: React.createRef(),
            color: "red",
            load: true
        };

    }

    componentDidMount(oldProps) {
        const canvas = this.state.canvasRef.current;
        const context = canvas.getContext('2d');

        this.blinking = setInterval(
            () => this.blink(context, canvas), 200
        );

        this.loaded = setInterval(
            () => this.load(), 3000
        );


        this.db.on('child_changed', snapshot => {
            this.setState({
                x: snapshot.child("x").val(),
                y: snapshot.child("y").val(),

            });

        });





    }


    componentWillUnmount() {
        clearInterval(this.blinking)
        this.db.off();
    }


    blink(context, canvas) {
        if (this.state.color === "red") {
            this.setState({ color: "#f0f0f0" });
        } else {
            this.setState({ color: "red" });
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc( (this.state.x/100)*295, (this.state.y/100)*135, 1.5, 0, 2 * Math.PI);
        context.fillStyle = this.state.color;
        context.fill();
    }

    load() {
        this.setState({ load: false });
    }







    render() {

        return (

            <LoadingScreen
                loading={this.state.load}
                bgColor='#f1f1f1'
                spinnerColor='#5271FF'
                textColor='#676767'
                text='GO AWAY!!!'>
                <div className="CanvasContainer">
                    <canvas className="MyCanvas" ref={this.state.canvasRef} >
                    </canvas>
                </div>
            </LoadingScreen>
        );
    }




}




export default Map;
