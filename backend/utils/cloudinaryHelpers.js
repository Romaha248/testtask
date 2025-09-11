function getEncodedPublicId(url) {
    try {
        const afterUpload = url.split('/upload/')[1];
        const withoutVersion = afterUpload.replace(/^v\d+\//, '');
        const withoutExtension = withoutVersion.replace(/\.[^/.]+$/, '');
        return encodeURIComponent(withoutExtension);
    } catch (error) {
        console.error('Invalid Cloudinary URL:', error);
        return null;
    }
}

export default getEncodedPublicId;