import { Card } from "antd";
import "../searchAllProduct/SearchResult.scss";
import Meta from "antd/es/card/Meta";

export const SearchResult = ({ result }) => {
    const isBridal = result.hasOwnProperty("NameBridal");

    // Extract common properties
    const name = isBridal ? result.NameBridal : result.DiamondName;
    const image = isBridal ? result.ImageBridal : result.Image;
    const price = isBridal ? result.Price : result.DiamondPrice;

    return (
        // <div
        //   className="search-result"
        //   onClick={(e) => alert(`You selected: ${result}!`)}
        // >
        //   {result}
        // </div>

        // <Card
        //     hoverable
        //     style={{ width: 180 }}
        //     cover={<img alt={result.NameBridal} src={result.ImageBridal} />}
        //     onClick={() => alert(`You selected: ${result.NameBridal}!`)}
        // >
        //     <Meta title={result.NameBridal} description={`Price: $${result.Price}`} />
        // </Card>

        <Card
            hoverable
            style={{ width: 180 }}
            cover={<img alt={name} src={image} />}
            onClick={() => alert(`You selected: ${name}!`)}
        >
            <Meta title={name} description={`Price: $${price}`} />
        </Card>
    );
};
