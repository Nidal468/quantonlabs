export const Section = ({ id, children, className = "" }: {
    id: string;
    children: React.ReactNode;
    className?: string;
}) => (
    <section id={id} className={`py-20 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    </section>
);