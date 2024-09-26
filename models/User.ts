import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import mongooseAutopopulate from 'mongoose-autopopulate';


export interface IUser extends Document {
  _id: string; // Identifiant unique
  lastName: string; // Nom
  firstName: string; // Prénom
  companyName: string; // Nom de l'entreprise
  logo: string; // Logo
  avatar : string //
  phone: string; // Numéro de téléphone
  address: string; // Adresse
  zip: string; // Code postal
  city: string; // Ville
  country: string; // Pays
  description: string; // Description
  category: Schema.Types.ObjectId;
  categoryType: 'Category_Customer' | 'Category_Producer'; // Type de catégorie
  wallet: Schema.Types.ObjectId;
  website: string; // Site web
  siret: string; // Numéro SIRET
  vat: string; // Numéro TVA
  email: string; // Adresse e-mail
  password: string; // Mot de passe
  authority: string[]; // Rôle
  qrCode: string; // Code QR
  createdAt: Date; // Date de création
  updatedAt: Date; // Date de mise à jour
  deletedAt: Date | null; // Date de suppression
  deleted: boolean; // Indique si le produit est supprimé
  device: string; // Identifiant du device
  status: boolean; // Indique si le produit est supprimé
  tags: string[]; // Tags
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  phone: { type: String, required: false },
  address: { type: String, required: false },
  companyName: { type: String, required: false },
  logo: { type: String, required: false },
  avatar: { type: String, required: false },
  category: {
    type: Schema.Types.ObjectId,
    refPath: 'categoryType',
    required: false,
    autopopulate: true
  },
  categoryType: {
    type: String,
    required: false,
    enum: ['Category_Customer', 'Category_Producer'] // Ajoutez ici les noms des modèles de catégories que vous souhaitez utiliser
  },
  wallet: {
    type: Schema.Types.ObjectId,
    ref: 'Wallet',
    required: false,
    autopopulate: true
  },
  zip: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  description: { type: String, required: false },
  website: { type: String, required: false },
  siret: { type: String, required: false },
  vat: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  qrCode: { type: String, required: false },
  authority: { type: [String], required: true, default: ["user"] },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  device: { type: String, required: false },
  status: { type: Boolean, default: true },
  tags: { type: [String], required: false },
});
UserSchema.plugin(mongooseAutopopulate);
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};



const User = mongoose.model<IUser>("User", UserSchema);
export default User;
