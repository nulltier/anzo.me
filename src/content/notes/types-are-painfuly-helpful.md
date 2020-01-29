---

id: '0003'
path: 'types-are-painfully-helpful'
title: 'Types are painfully helpful'
tags:
    - typescript
    - types
short: |
    The types are working even if they irritate you. And even more of that. The more typechecking is a pain the bigger the benefits.

---

It is pretty usual when the collective and well-organised efforts of many peoples outperform any abilities a regular person. The typescript illustrates the idea routinely. The warnings and errors raised in places which initially I couldn't agree with after a time of frustration bestow me a refined understanding of a code I wrote.

A recent encounter with type checking was pretty simple to describe it here with all important details but yet in short.

Let's say we to show the tooltips like the one shown below in different places of a certain site.

<figure>
    <img src="https://d1svz1b6z7p08i.cloudfront.net/images/2020/tooltip-example-cut.png" alt="Tooltip example from the wikipedia.org" style="max-height: 470px;"/>
    <figcaption>a tooltip, random example from the <a href="https://en.wikipedia.org/wiki/Browser_engine">Wikipedia.org</a></figcaption>
</figure>

And for the sake of maintainability let's add a facade for an external library used to manage tooltip positioning in different situations.

```typescript
import { TooltipLibrary } from 'tooltip-library';

interface TooltipLibrary {
    new(trigger: HTMLElement, content: string, options: {event: string}): void;
    show(): void;
    hide(): void;
    changeContent(content: string): void;
    destroy(): void;
}

class TooltipFacade {
    private tooltip: TooltipLibrary;

    private static getHTMLElement(selector: string): HTMLElement | null {
        return document.querySelector(selector);
    }

    public constructor(
        selector: string,
        content: string,
        options: { event: string } = { event: 'mouseover' }
    ) {
        const trigger = TooltipFacade.getHTMLElement(selector);

        if (trigger === null) {
            throw Error('No element found');
        }

        this.tooltip = new TooltipLibrary(trigger, content, options);
    }

    public changeContent(content: string): void {
        this.tooltip.changeContent(content);
    }

    // ... other methods
}
```

We get get `null` from `querySelector` and have to handle it, otherwise, we will get an exception from a library. But wait. Why do we need to throw the exception to avoid an exception? Why do we need an exception?

The tooltips aren't a critical part of our application. We may run without them and users will even notice nothing. We can replace the error throwing with simple `console.error()` to help the users of our facade to identify a problem faster.

```typescript
// TooltipFacade.constructor
const trigger = TooltipFacade.getHTMLElement(selector);

if (trigger === null) {
    console.error('No element found');
    return;
}

this.tooltip = new TooltipLibrary(trigger, content, options);
```

Now the users of our facade are safe if the page is changed in a way they are not aware. There is no risk for them to get unhandled exception out of nowhere. That is how I was thinking out of the box. But the typescript was not agreed with the idea of mine.

```typescript
class TooltipFacade {
    // ERROR: Property 'tooltip' has no initializer and is not definitely assigned in the constructor.
    private tooltip: TooltipLibrary;
    // ...
}
```

Why??? Why it need tooltip not null. No one needs the method because there is no related HTML element so why the typescript is so rigid on us. It is unfair. Why smarter than a mere code compiler. We'll trick it.

```typescript
class TooltipFacade {
    private tooltip: TooltipLibrary | null = null;
}
```

And, of course it won't work.

```typescript
class TooltipFacade {
    // ...
    public changeContent(content: string): void {
        // Object is possibly 'null'.
        this.tooltip.changeContent(content);
    }
}
```

What??? How it can be. I see the `constructor` clearly. There is the `this.tooltip` set with the instance of a `TooltipLibrary`. How on Earth it could be null. Hoow?! You are kidding me, typescript, right?

```typescript
// TooltipFacade.constructor
this.tooltip = new TooltipLibrary(trigger, content, options);
```

It took a lot of emotions of me before typescript reached me with its warnings. We have hidden the problem from the callers of our API. And that is why they will call the methods of our facade no matter what, do we have an element or don't. And this is why typescript was trying to inform me about the problems.
