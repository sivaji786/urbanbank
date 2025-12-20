import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calculator, FileSpreadsheet, Download, Shield } from 'lucide-react';

export function ToolsSection() {
  const tools = [
    {
      icon: Calculator,
      title: 'EMI Calculator',
      description: 'Calculate your loan EMI instantly',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FileSpreadsheet,
      title: 'Interest Calculator',
      description: 'Calculate returns on your deposits',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Download,
      title: 'Download Forms',
      description: 'Get all banking forms in one place',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Shield,
      title: 'Deposit Insurance',
      description: 'Learn about DICGC coverage',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue-600 uppercase tracking-wide">Banking Tools</p>
          <h2 className="text-3xl lg:text-4xl text-gray-900 mt-2">Guntur Bank Tools</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Access our banking tools and calculators for better financial planning
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 group cursor-pointer overflow-hidden">
              <CardContent className="p-6 text-center relative">
                <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <tool.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  Access Tool
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
