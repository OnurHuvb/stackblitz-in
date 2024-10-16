import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import axios from 'axios';

const TeachingInfo: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    level_bilgisi: '', // grade_information yerine level_bilgisi kullanıyoruz
    ders_brans: '',
    class_size: 30,
    student_discipline_status: 'Average (Neutral)',
    academic_hazirbulunusluluk: 'Satisfactory (60-74%)',
    ogretmen_tecrube_durumu: 1,
  });

  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);

  useEffect(() => {
    updateSubjectOptions(formData.level_bilgisi);
  }, [formData.level_bilgisi]);

  const updateSubjectOptions = (gradeLevel: string) => {
    switch (gradeLevel) {
      case "Kindergarten":
        setSubjectOptions(["Kindergarten Teacher"]);
        break;
      case "Primary School (1-4)":
        setSubjectOptions(["Primary School Teacher"]);
        break;
      case "Middle School (5-8)":
        setSubjectOptions([
          "Mathematics", "Science", "Social Studies", "Religious Culture and Ethics",
          "Music", "Visual Arts", "Physical Education", "Information Technologies",
          "Technology and Design"
        ]);
        break;
      case "High School (9-12)":
        setSubjectOptions([
         "Mathematics", "Physics", "Chemistry", "Biology", "Philosophy", "Literature",
  "History", "Geography", "Foreign Language - English", "Foreign Language - French",
  "Foreign Language - German", "Foreign Language - Arabic", "MTAL - Electrical Electronics Technology",
  "MTAL - Furniture Interior Decoration", "MTAL - Motor Vehicles Technology", "MTAL - Information Technologies",
  "MTAL - Technology and Design / Business Education", "MTAL - Accounting Finance", 
  "MTAL - Accommodation and Travel", "MTAL - Marketing and Retailing", "MTAL - Graphic Design", 
  "MTAL - Journalism / Public Relations", "MTAL - Handicrafts / Decorative Arts", 
  "MTAL - Child Development and Education", "MTAL - Office Management and Secretariat", 
  "MTAL - Food and Beverage Services", "MTAL - Clothing / Ready-to-Wear / Fashion Design", 
  "MTAL - Plumbing Technology and Air Conditioning", "MTAL - Electronics / Telecommunications", 
  "MTAL - Computer and Instructional Technologies", "MTAL - Leather Shoes and Saddlery Leather Technology", 
  "MTAL - Casting Industrial Casting", "MTAL - Graphics and Photography", "MTAL - Machinery / Sawing / Mold Technology", 
  "MTAL - Hairdressing Beauty and Skin Care", "MTAL - Sewing Embroidery", 
  "MTAL - Health Knowledge / Health Vocational Knowledge", "MTAL - Radio Television", 
  "MTAL - Metal Technology", "MTAL - Shipbuilding (Construction)", "MTAL - Home Economics", 
  "MTAL - Machine Drawing and Technology", "Art History", "MTAL - Ceramic and Glass Technology", 
  "MTAL - Aquaculture", "MTAL - Ornamental Plants", "MTAL - Mapping / Land Registry", 
  "PDR Psychological Counseling", "MTAL - Textile Design", "MTAL - Jewelry Technology", 
  "MTAL - Firefighting and Fire Safety", "MTAL - Patient and Elderly Services", 
  "MTAL - Rail Systems Technology", "MTAL - Transportation Services Logistics", 
  "MTAL - Justice", "MTAL - Construction Technology", "MTAL - Health / Health Services", 
  "MTAL - Public Relations and Organization Services", "Information Technologies", 
  "Technology Design", "MTAL - Aircraft Electronics", "Mathematics Primary", 
   "Beauty Services", "MTAL - Food Technology", "MTAL - Ship Management", 
  "MTAL - Agricultural Technologies", "MTAL - Fashion Design and Technology", 
  "MTAL - Renewable Energy Technologies"
        ]);
        break;
      default:
        setSubjectOptions([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/teaching-info', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Teaching information saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving teaching information:', error);
      alert('Error saving teaching information. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/dashboard" className="flex items-center text-purple-600 hover:text-purple-800 mb-8">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Teaching Information</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="level_bilgisi" className="block text-gray-700 font-bold mb-2">Grade Level</label>
            <select
              id="level_bilgisi"
              name="level_bilgisi"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={formData.level_bilgisi}
              onChange={handleChange}
              required
            >
              <option value="">Select Grade Level</option>
              {["Kindergarten", "Primary School (1-4)", "Middle School (5-8)", "High School (9-12)"].map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="ders_brans" className="block text-gray-700 font-bold mb-2">Subject</label>
            <select
              id="ders_brans"
              name="ders_brans"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={formData.ders_brans}
              onChange={handleChange}
              required
            >
              <option value="">Select Subject</option>
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="class_size" className="block text-gray-700 font-bold mb-2">Class Size: {formData.class_size}</label>
            <input
              type="range"
              id="class_size"
              name="class_size"
              min="19"
              max="41"
              className="w-full"
              value={formData.class_size}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="student_discipline_status" className="block text-gray-700 font-bold mb-2">
              Student Discipline Status
            </label>
            <select
              id="student_discipline_status"
              name="student_discipline_status"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={formData.student_discipline_status}
              onChange={handleChange}
            >
              <option value="Excellent (Very Positive)">Excellent (Very Positive)</option>
              <option value="Good (Positive)">Good (Positive)</option>
              <option value="Average (Neutral)">Average (Neutral)</option>
              <option value="Below Average (Challenging)">Below Average (Challenging)</option>
              <option value="Poor (Very Challenging)">Poor (Very Challenging)</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="academic_hazirbulunusluluk" className="block text-gray-700 font-bold mb-2">
              Academic Readiness
            </label>
            <select
              id="academic_hazirbulunusluluk"
              name="academic_hazirbulunusluluk"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={formData.academic_hazirbulunusluluk}
              onChange={handleChange}
            >
              <option value="Outstanding (90-100%)">Outstanding (90-100%)</option>
              <option value="Good (75-89%)">Good (75-89%)</option>
              <option value="Satisfactory (60-74%)">Satisfactory (60-74%)</option>
              <option value="Needs Improvement (50-59%)">Needs Improvement (50-59%)</option>
              <option value="Unsatisfactory (Below 50%)">Unsatisfactory (Below 50%)</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="ogretmen_tecrube_durumu" className="block text-gray-700 font-bold mb-2">Teaching Experience: {formData.ogretmen_tecrube_durumu} {formData.ogretmen_tecrube_durumu === 6 ? '+' : ''} years</label>
            <input
              type="range"
              id="ogretmen_tecrube_durumu"
              name="ogretmen_tecrube_durumu"
              min="1"
              max="6"
              className="w-full"
              value={formData.ogretmen_tecrube_durumu}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 flex items-center justify-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeachingInfo;
