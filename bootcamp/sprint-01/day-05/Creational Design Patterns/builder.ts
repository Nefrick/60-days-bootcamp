enum ImageFormat {
  PNG = 'png',
  JPG = 'jpg',
  GIF = 'gif',
}


interface IResolution {
  width: number;
  height: number;
}

interface IImageConversion extends IResolution {
 format: ImageFormat;
}

class ImageBuilder {
    private formats: ImageFormat[] = [];
    private resolution: IResolution[] = [];
    
    addPng(){
        if(this.formats.includes(ImageFormat.PNG)){
            return this;
        }
        this.formats.push(ImageFormat.PNG);
        return this;
    }

    addJpg(){
        if(this.formats.includes(ImageFormat.JPG)){
            return this;
        }
        this.formats.push(ImageFormat.JPG);
        return this;
    }

    addGif(){

        if(this.formats.includes(ImageFormat.GIF)){
            return this;
        }   
        this.formats.push(ImageFormat.GIF);
        return this;
    }

    addResolution(width: number, height: number){
        this.resolution.push({ width, height });
        return this;
    }

    build(): IImageConversion[] {
        const result: IImageConversion[] = [];
        for (const format of this.formats) {
            for (const res of this.resolution) {
                result.push({ ...res, format });
            }
        }
        return result;
    }
}

console.log(new ImageBuilder().addPng().addJpg().addResolution(1920, 1080).addResolution(1280, 720).build());