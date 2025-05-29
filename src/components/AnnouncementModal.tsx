
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: {
    id: number;
    type: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    highlights: string[];
    priority: string;
  } | null;
}

const AnnouncementModal = ({ isOpen, onClose, announcement }: AnnouncementModalProps) => {
  if (!announcement) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'festival': return 'bg-orange-100 text-orange-800';
      case 'event': return 'bg-blue-100 text-blue-800';
      case 'pooja': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(announcement.type)}`}>
              {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
            </span>
            {announcement.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Event Details */}
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              <span>{new Date(announcement.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              <span>{announcement.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-green-500" />
              <span>{announcement.location}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
            <p className="text-gray-700">{announcement.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Highlights</h4>
            <ul className="space-y-2">
              {announcement.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <span className="text-orange-500 mr-2 font-bold">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Information based on type */}
          {announcement.type === 'festival' && (
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">Festival Information</h4>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• Traditional attire is encouraged</li>
                <li>• Photography allowed in designated areas</li>
                <li>• Parking available in temple premises</li>
                <li>• Food and water will be provided</li>
                <li>• Volunteers needed for event coordination</li>
              </ul>
            </div>
          )}

          {announcement.type === 'pooja' && (
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">Pooja Information</h4>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• Advance registration required</li>
                <li>• Bring fresh flowers and fruits</li>
                <li>• Arrive 15 minutes early</li>
                <li>• Mobile phones should be on silent</li>
                <li>• Receipt required for entry</li>
              </ul>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Temple Office: +91 98765 43210</p>
              <p>Email: info@templemanagement.com</p>
              <p>For more details, visit the temple office between 9 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementModal;
