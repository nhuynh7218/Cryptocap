import React, { useState } from "react";
import { Image } from "@chakra-ui/react"
import { motion } from "framer-motion";
export default function Article() {
    let sampleArticle = {
        clicks: 88,
        id: 'jdhf872f',
        source: 'Twitter',
        title: 'BTC Crashed',
        votes: 76,
        author: 'Some Name',
        date: new Date(),
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis ipsum nec ligula commodo pulvinar. Morbi nulla mauris, fringilla ornare nunc vel, tempus blandit turpis. Maecenas nibh purus, viverra vel consequat sit amet, efficitur sed nisl. Phasellus consectetur, erat quis dapibus accumsan, justo sem hendrerit augue, quis consectetur magna lorem sed lectus. Praesent maximus feugiat semper. Curabitur facilisis sapien vel mauris dignissim, nec sagittis est bibendum. Integer faucibus commodo nisi et aliquet. Curabitur ac vestibulum lorem, a laoreet lorem. Nullam sed tincidunt tellus, in varius ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed arcu sapien, porttitor nec iaculis et, hendrerit eu eros.

        Integer tincidunt libero et vestibulum vestibulum. Sed egestas enim at suscipit pulvinar. Etiam quis libero suscipit, aliquet enim ac, feugiat ante. Mauris in blandit tortor. Donec commodo tortor eu efficitur porttitor. Ut ornare libero euismod purus varius imperdiet sit amet quis velit. Proin tincidunt eu purus vitae semper.
        
        Aliquam aliquet enim lacus, et lacinia ante vulputate a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra dapibus dui, vitae auctor purus euismod quis. Sed tincidunt vulputate dui eget pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed tincidunt diam urna, ut ultrices lacus rutrum eget. Proin diam est, varius id condimentum et, sodales id massa. Vivamus molestie, libero eget varius sodales, nulla leo ornare eros, a tincidunt libero tortor non lectus. Phasellus sit amet suscipit enim. Ut volutpat imperdiet cursus. Proin sit amet tristique dui, quis tempus eros. Aliquam magna enim, sodales non eros quis, vulputate molestie ligula. Sed posuere a sapien varius malesuada. Nullam sodales nec metus sed dignissim.
        
        Nunc nec nisl placerat, scelerisque sem eu, vestibulum quam. In porttitor purus arcu, vitae mollis odio laoreet in. Sed egestas facilisis efficitur. Fusce tortor augue, vehicula ut diam eu, facilisis varius tortor. Quisque consectetur porttitor dignissim. Aliquam pretium semper mi vel euismod. Nullam in blandit tellus, ut pellentesque metus. Proin laoreet sed nibh eu luctus. Quisque dapibus arcu in eros lobortis gravida mattis sed metus. Vivamus in urna fermentum, aliquam lacus sit amet, egestas tellus. Nulla dignissim ligula id tortor placerat blandit vitae sed ipsum. Morbi a leo libero. Aliquam dignissim eget tortor a efficitur. Mauris egestas orci vitae facilisis ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        
        Etiam ac risus ut nunc condimentum iaculis nec et neque. Nulla vitae ipsum quis lorem facilisis fringilla quis a sem. Curabitur erat nunc, blandit id suscipit in, porta finibus arcu. Ut ultricies nulla eget massa ultricies, ac placerat mi lacinia. Pellentesque in egestas metus. Donec in neque lobortis, consectetur nulla in, finibus nisi. Nullam condimentum elit vel fringilla blandit. Proin id quam posuere, molestie velit vel, efficitur tortor. Curabitur ante dui, sodales sed cursus et, fringilla ut odio.
        
        `,
        image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80',
        tags: ['BTC', 'USA']

    }
    const [totalVotes, setVotes] = useState(sampleArticle.votes)
    const container = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
          transition: {
            staggerChildren: 0.025
          }
        }
      };
    return (
        <div className="flex flex-col items-center space-y-4 py-4">
            <div className=" font-black text-center">
                <motion.p animate={{x: ["-700%", "0%"]}} transition={{duration: 0.75}}>{new Date().toDateString()}</motion.p>
                <motion.p animate={{x: ["700%", "0%"]}} transition={{duration: 0.75}}> 4 Mins Ago</motion.p>
            </div>
            <motion.p animate={{y: ["-700%", "80%","-30%", "0%"]}} transition={{duration: 1, delay:0.75}} className=" font-extrabold text-2xl underline">{sampleArticle.title}</motion.p>
<motion.div animate={{scale:[0,1]}} transition={{duration: 0.55, delay:0.75}}>
<Image width={350} height={300} src={sampleArticle.image} className=" shadow-2xl rounded  duration-500 transition-all"></Image>

</motion.div>
           <div className="flex flex-col">
            <button className=" font-bold text-md "> <SplitText 
                initial={{ y: '100%' }}
                animate="visible"
                variants={{
                  visible: (i: number) => ({
                    y: 0,
                    transition: {
                      delay: i * 0.33
                    }
                  })
                }}
              >
              {"By: " + sampleArticle.author}
              </SplitText></button>
              <button  className=" font-bold text-md "> <SplitText 
                initial={{ y: '100%' }}
                animate="visible"
                variants={{
                  visible: (i: number) => ({
                    y: 0,
                    transition: {
                      delay: i * 0.33
                    }
                  })
                }}
              >
             {"Source: " + sampleArticle.source}
              </SplitText></button>
           </div>


            <div className="flex flex-row justify-between space-x-4">
                <button onClick={() => setVotes(totalVotes +1 )}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-green-400" fill="green" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg></button>
                <p className="font-black text-md cursor-default transition-all">{totalVotes}</p>
                <button onClick={() => setVotes(totalVotes - 1 )}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-pink-400" fill="red" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg></button>

            </div>
            <div className="font-semibold   px-10 md:px-20 lg:px-0 lg:w-3/4 xl:w-3/5">
           
            </div>
     
            <motion.p initial={container.hidden}  animate={container.visible} variants={container} className="font-semibold   px-10 md:px-20 lg:px-0 lg:w-3/4 xl:w-3/5 ">
                {sampleArticle.description}
            </motion.p>
            <div className="flex flex-col font-extrabold text-2xl">
                <p>Related</p>
            </div>

        </div>
    )
}
//@ts-ignore
function SplitText({ children, ...rest }) {
    let words = children.split(' ')
    return words.map((word: string, i: number) => {
      return (
        <div 
          key={children + i}
          style={{ display: 'inline-block', overflow: 'hidden' }}
        >
          <motion.div
           
            {...rest}
            style={{ display: 'inline-block', willChange: 'transform' }}
            custom={i}
          >
            {word + (i !== words.length - 1 ? '\u00A0' : '')}
          </motion.div>
        </div>
      )
    })
  }