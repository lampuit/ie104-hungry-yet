import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  export function FAQ() {
    return (
      <Accordion type="single" collapsible className="lg:w-[420px] md:w-72 sm:w-48 space-y-6 pr-4">
        <AccordionItem value="item-1" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
          <AccordionTrigger>What is Hungry Yet?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione illum veritatis quae corrupti laudantium.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
          <AccordionTrigger>What is Hungry Yet?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione illum veritatis quae corrupti laudantium.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
          <AccordionTrigger>What is Hungry Yet?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione illum veritatis quae corrupti laudantium.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
          <AccordionTrigger>What is Hungry Yet?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione illum veritatis quae corrupti laudantium.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
          <AccordionTrigger>What is Hungry Yet?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione illum veritatis quae corrupti laudantium.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="border-2 border-[#99BD76] shadow-md shadow-[#99BD7680] rounded-3xl px-6">
          <AccordionTrigger>What is Hungry Yet?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione illum veritatis quae corrupti laudantium.
          </AccordionContent>
        </AccordionItem>
        
      </Accordion>
    )
  }