import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  export function FAQ() {
    return (
      <Accordion type="single" collapsible className="xl:w-96 md:w-64 sm:w-48">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Hungry Yet?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione illum veritatis quae corrupti laudantium.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>What is Hungry Yet?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione illum veritatis quae corrupti laudantium.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What is Hungry Yet?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione illum veritatis quae corrupti laudantium.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>What is Hungry Yet?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ratione illum veritatis quae corrupti laudantium.
          </AccordionContent>
        </AccordionItem>
        
      </Accordion>
    )
  }