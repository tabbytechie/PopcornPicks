# Module Conventions

Each feature module owns: components/, hooks/, services/, types/, utils/, pages/, constants/, styles/ and exposes a public index.ts. Modules depend on each other only through published interfaces so they can later become microservices.
