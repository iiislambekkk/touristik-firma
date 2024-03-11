import Image from "next/image";
import styles from "./page.module.css";
import Button from "antd/es/button/button";
import {Carousel, Space} from "antd";


export default function Home() {
    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

  return (
      <>
          <Carousel autoplay style={{width: "1000px", height: "300px", margin: "50px auto 0 auto"}}>
              <div>
                  <h1>1</h1>
              </div>
              <div>
                  <h1>1</h1>
              </div>
              <div>
                  <h1>1</h1>
              </div>
          </Carousel>
      </>
  );
}
